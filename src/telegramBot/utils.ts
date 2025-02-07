import { Context } from "telegraf";
import { CustomClaims, User, UserRole } from "../users/types";
import { logger } from "firebase-functions";
import * as userService from "../users/service";
import { FetchResult, OrganizationID, TelegramUserID } from "../lib/types";
import { TGUserNotFoundError } from "../users/errors";
import { generateUserIDFromTelegramID, isReadableRole } from "../users/utils";
import { UserWithClaims } from "./types";
import { Organization } from "../organizations/types";
import * as organizationService from "../organizations/service";

export const UNREGISTERED_USER_MESSAGE =
  "You are not registered. Please use /start to register before running this command.";

export const SOMETHING_WENT_WRONG_MESSAGE =
  "Something went wrong. Please try again.";

export const getUserFromContext = async (
  context: Context
): Promise<UserWithClaims> => {
  logger.info("Fetching user from context", {
    from: context.from,
    chat: context.chat,
  });

  if (!context.from) {
    logger.debug("Unable to retrieve user details");
    throw new Error("Unable to retrieve your user details. Please try again.");
  }

  let user: FetchResult<User> | null = null;
  let parsedClaims: CustomClaims | null = null;
  const expectedUserID = generateUserIDFromTelegramID(
    context.from.id as TelegramUserID
  );

  try {
    const [userRecord, userAuth] = await Promise.all([
      userService.getByUserID(expectedUserID),
      userService.getAuth(expectedUserID),
    ]);
    user = userRecord;
    parsedClaims = userAuth?.parsedClaims ?? null;
  } catch (err: any) {
    logger.error("Error fetching user", {
      errMessage: err?.message,
      code: err?.code,
    });
    throw new Error(SOMETHING_WENT_WRONG_MESSAGE);
  }

  if (!user) {
    logger.info("User not found", {
      expectedUserID,
      from: context.from,
    });
    throw new TGUserNotFoundError(
      "User not found",
      expectedUserID,
      context.from.id as TelegramUserID
    );
  }

  if (!parsedClaims || !parsedClaims.roles || parsedClaims.roles.length === 0) {
    logger.error("User claims not found", {
      user,
      parsedClaims,
      expectedUserID,
    });
    throw new Error(SOMETHING_WENT_WRONG_MESSAGE);
  }

  logger.info("User details", { user, parsedClaims });

  return { user, claims: parsedClaims };
};

/**
 * Escapes Telegram MarkdownV2 special characters by prefixing them with a backslash.
 * The characters escaped are: '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'
 *
 * @param text The input string to escape.
 * @returns The escaped string.
 */
export function escapeMarkdown(text: string): string {
  // We create a regex that matches any of the special characters.
  // Using the RegExp constructor with a string literal lets us easily escape the characters.
  const escapeCharsRegex = new RegExp(
    "([_*\\[\\]\\(\\)~`>#+\\-=\\|{}\\.!])",
    "g"
  );
  return text.replace(escapeCharsRegex, "\\$1");
}

export const getUserOrganization = async (
  user: UserWithClaims,
  organizationID?: OrganizationID
): Promise<{
  organization: FetchResult<Organization>;
  role: UserRole;
}> => {
  // Matches an organizationID passed in, or selects the first in the list
  const userRole = user.claims?.roles?.find((role) =>
    organizationID ? role.organizationID === organizationID : true
  );
  logger.info("Fetching user organization", { user });
  if (!userRole) {
    logger.error("User has no organization in claims", {
      user,
      claims: user.claims,
    });
    throw new Error(SOMETHING_WENT_WRONG_MESSAGE);
  }

  if (!isReadableRole(userRole)) {
    logger.error("User has no readable role", {
      user,
      userRole,
    });
    throw new Error(SOMETHING_WENT_WRONG_MESSAGE);
  }

  let organization: FetchResult<Organization> | null = null;
  try {
    organization = await organizationService.getByID(userRole.organizationID);
  } catch (err: any) {
    logger.error("Error fetching organization", {
      errMessage: err?.message,
      code: err?.code,
    });
    throw new Error(SOMETHING_WENT_WRONG_MESSAGE);
  }

  if (!organization) {
    logger.error("Organization not found", {
      organizationID: userRole.organizationID,
      userID: user.user.data.id,
      userRole,
    });
    throw new Error(SOMETHING_WENT_WRONG_MESSAGE);
  }

  return { organization, role: userRole };
};
