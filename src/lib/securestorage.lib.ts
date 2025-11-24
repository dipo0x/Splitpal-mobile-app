import * as SecureStore from "expo-secure-store";

export const StorageKeys = {
  ACCESS_TOKEN: "auth_access_token",
  REFRESH_TOKEN: "auth_refresh_token",
  USER_ID: "auth_user_id",
  REMEMBER_ME: "auth_remember_me",
} as const;

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt?: number;
}

export interface SecureStorageOptions {
  requireAuthentication?: boolean;
  authenticationPrompt?: string;
}

export async function saveSecure(
  key: string,
  value: string,
  options?: SecureStorageOptions
): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value, {
      requireAuthentication: options?.requireAuthentication,
      authenticationPrompt:
        options?.authenticationPrompt || "authenticate to save",
    });
  } catch (error) {
    throw new Error(`failed to save ${key} securely: ${error}`);
  }
}

export async function getSecure(
  key: string,
  options?: SecureStorageOptions
): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key, {
      requireAuthentication: options?.requireAuthentication,
      authenticationPrompt:
        options?.authenticationPrompt || "Authenticate to access",
    });
  } catch (error) {
    console.error(`secure storage error getting ${key}:`, error);
    return null;
  }
}

export async function deleteSecure(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    throw new Error(`failed to save ${key} securely: ${error}`);
  }
}

export async function saveTokens(
  userId: string,
  accessToken: string,
  refreshToken: string,
  expiresAt?: number
): Promise<void> {
  try {
    await Promise.all([
      saveSecure(StorageKeys.ACCESS_TOKEN, accessToken),
      saveSecure(StorageKeys.REFRESH_TOKEN, refreshToken),
      saveSecure(StorageKeys.USER_ID, userId),
      expiresAt
        ? saveSecure("auth_expires_at", expiresAt.toString())
        : Promise.resolve(),
    ]);
  } catch (error) {
    throw new Error(`failed to save authentication tokens securely: ${error}`);
  }
}

export async function getTokens(): Promise<TokenData | null> {
  try {
    const [accessToken, refreshToken, expiresAtStr] = await Promise.all([
      getSecure(StorageKeys.ACCESS_TOKEN),
      getSecure(StorageKeys.REFRESH_TOKEN),
      getSecure("auth_expires_at"),
    ]);

    if (!accessToken || !refreshToken) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      expiresAt: expiresAtStr ? parseInt(expiresAtStr, 10) : undefined,
    };
  } catch (error) {
    console.error("error getting tokens:", error);
    return null;
  }
}

export async function isTokenExpired(): Promise<boolean> {
  try {
    const expiresAtStr = await getSecure("auth_expires_at");
    if (!expiresAtStr) {
      return true;
    }

    const expiresAt = parseInt(expiresAtStr, 10);
    const now = Date.now();

    const bufferMs = 5 * 60 * 1000;

    return now >= expiresAt - bufferMs;
  } catch (error) {
    console.error("error checking token expiration:", error);
    return true;
  }
}

export async function clearTokens(): Promise<void> {
  try {
    await Promise.all([
      deleteSecure(StorageKeys.ACCESS_TOKEN),
      deleteSecure(StorageKeys.REFRESH_TOKEN),
      deleteSecure("auth_expires_at"),
      deleteSecure(StorageKeys.USER_ID),
    ]);
  } catch (error) {
    console.error("[SecureStorage] Error clearing tokens:", error);
    throw new Error("Failed to clear authentication tokens");
  }
}

export async function isSecureStorageAvailable(): Promise<boolean> {
  try {
    const testKey = "__secure_storage_test__";
    await SecureStore.setItemAsync(testKey, "test");
    await SecureStore.deleteItemAsync(testKey);
    return true;
  } catch (error) {
    console.error("secure storage not available:", error);
    return false;
  }
}
