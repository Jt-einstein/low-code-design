import { ViewPort } from './CardLayout';
import { ViewTabs } from './TabsLayout/ViewTabs';

export const Layout: {
  CardLayout: typeof ViewPort;
  TabsLayout: typeof ViewTabs;
} = {
  CardLayout: ViewPort,
  TabsLayout: ViewTabs,
};
