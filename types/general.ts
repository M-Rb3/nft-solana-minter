/*
  General types for general uses
*/

import { Metadata } from "next";

/**
 * Default props for all layouts
 */
export type SimpleLayoutProps = {
  children: React.ReactNode;
  seo?: Metadata;
  className?: string;

  /**
   * Single component containing Dialog components to be included within the layout
   */
  dialogs?: React.ReactNode;
};
