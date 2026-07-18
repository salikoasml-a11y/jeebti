import type { Namespace } from "@/lib/i18n/types";
import { common } from "./common";
import { auth } from "./auth";
import { landing } from "./landing";
import { dashboard } from "./dashboard";
import { wallet } from "./wallet";
import { transactions } from "./transactions";
import { cards } from "./cards";
import { savings } from "./savings";
import { payments } from "./payments";
import { profileSettings } from "./profile-settings";
import { help } from "./help";

const allNamespaces: Namespace[] = [
  common,
  auth,
  landing,
  dashboard,
  wallet,
  transactions,
  cards,
  savings,
  payments,
  profileSettings,
  help,
];

export const dictionary: Namespace = Object.assign({}, ...allNamespaces);
