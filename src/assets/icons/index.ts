// Import all SVG icons and export them with clean names
import FreezeCardIcon from "./freeze-card.svg";
import SetSpendLimitIcon from "./set-spend-limit.svg";
import GPayIcon from "./GPay.svg";
import ReplaceCardIcon from "./replace-card.svg";
import DeactivateCardIcon from "./deactivate-card.svg";
import AspireLogoIcon from "./Aspire-Logo.svg";
import HomeIcon from "./Home.svg";
import CardIcon from "./Card.svg";
import PaymentsIcon from "./Payments.svg";
import CreditIcon from "./Credit.svg";
import AccountIcon from "./Account.svg";
import Group11889Icon from "./group-11889.svg";
import DownArrowIcon from "./down-arrow.svg";
import DownArrow1Icon from "./down-arrow-1.svg";
import CardDetails from "./group-11889.svg";
import CardTransactions from "./group-11889-1.svg";
import BusinessAndFinanceIcon from "./business-and-finance.svg";

// mobile icons
import HomeIconMobile from "./logo-mobile.svg";
import CardIconMobile from "./cards-mobile.svg";
import PaymentsIconMobile from "./payments-mobile.svg";
import CreditIconMobile from "./credit-mobile.svg";
import AccountIconMobile from "./profile-mobile.svg";
import PlusIcon from "./box.svg";

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
  HomeIconMobile,
  CardIconMobile,
  PaymentsIconMobile,
  CreditIconMobile,
  AccountIconMobile,
  PlusIcon,
};

// Icon registry for the Icon component
export const iconRegistry = {
  freezeCard: FreezeCardIcon,
  setSpendLimit: SetSpendLimitIcon,
  gPay: GPayIcon,
  replaceCard: ReplaceCardIcon,
  deactivateCard: DeactivateCardIcon,
  aspirelogo: AspireLogoIcon,
  home: HomeIcon,
  card: CardIcon,
  payments: PaymentsIcon,
  credit: CreditIcon,
  account: AccountIcon,
  group11889: Group11889Icon,
  downArrow: DownArrowIcon,
  downArrow1: DownArrow1Icon,
  cardDetails: CardDetails,
  cardTransactions: CardTransactions,
  businessAndFinance: BusinessAndFinanceIcon,
  homeMobile: HomeIconMobile,
  cardMobile: CardIconMobile,
  paymentsMobile: PaymentsIconMobile,
  creditMobile: CreditIconMobile,
  accountMobile: AccountIconMobile,
  plus: PlusIcon,
} as const;

export type IconName = keyof typeof iconRegistry;
