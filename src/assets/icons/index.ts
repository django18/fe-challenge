// Import all SVG icons and export them with clean names
import FreezeCardIcon from "./Freeze card.svg";
import SetSpendLimitIcon from "./Set spend limit.svg";
import GPayIcon from "./GPay.svg";
import ReplaceCardIcon from "./Replace card.svg";
import DeactivateCardIcon from "./Deactivate card.svg";
import AspireLogoIcon from "./Aspire-Logo.svg";
import HomeIcon from "./Home.svg";
import CardIcon from "./Card.svg";
import PaymentsIcon from "./Payments.svg";
import CreditIcon from "./Credit.svg";
import AccountIcon from "./Account.svg";
import Group11889Icon from "./Group 11889.svg";
import DownArrowIcon from "./down-arrow.svg";
import DownArrow1Icon from "./down-arrow (1).svg";
import CardDetails from "./Group 11889.svg";
import CardTransactions from "./Group 11889 (1).svg";
import BusinessAndFinanceIcon from "./business-and-finance.svg";

// Export all icons with consistent naming
export {
  FreezeCardIcon,
  SetSpendLimitIcon,
  GPayIcon,
  ReplaceCardIcon,
  DeactivateCardIcon,
  AspireLogoIcon,
  HomeIcon,
  CardIcon,
  PaymentsIcon,
  CreditIcon,
  AccountIcon,
  Group11889Icon,
  DownArrowIcon,
  DownArrow1Icon,
  CardDetails,
  CardTransactions,
  BusinessAndFinanceIcon,
};

// Also export as a registry object for dynamic access
export const iconRegistry = {
  freezeCard: FreezeCardIcon,
  setSpendLimit: SetSpendLimitIcon,
  gPay: GPayIcon,
  replaceCard: ReplaceCardIcon,
  deactivateCard: DeactivateCardIcon,
  aspireLogo: AspireLogoIcon,
  home: HomeIcon,
  card: CardIcon,
  payments: PaymentsIcon,
  credit: CreditIcon,
  account: AccountIcon,
  group11889: Group11889Icon,
  downArrow: DownArrowIcon,
  downArrow1: DownArrow1Icon,
  cardDetails: CardDetails,
  businessAndFinance: BusinessAndFinanceIcon,
  cardTransactions: CardTransactions,
} as const;

export type IconName = keyof typeof iconRegistry;
