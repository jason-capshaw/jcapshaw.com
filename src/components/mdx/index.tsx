import type { MDXComponents } from "mdx/types";
import Callout from "@/components/mdx/Callout";
import Disclosure from "@/components/mdx/Disclosure";
import Switcher, { Pane } from "@/components/mdx/Switcher";
import PullQuote from "@/components/mdx/PullQuote";
import Diagram from "@/components/mdx/Diagram";
import PipelineDiagram from "@/components/mdx/PipelineDiagram";
import ShapesMatrix from "@/components/mdx/ShapesMatrix";
import OwnershipDiagram from "@/components/mdx/OwnershipDiagram";
import CodeBlock from "@/components/mdx/CodeBlock";
import { Footnote, Notes, Note } from "@/components/mdx/Footnote";

export const mdxComponents: MDXComponents = {
  Callout,
  Disclosure,
  Switcher,
  Pane,
  PullQuote,
  Diagram,
  PipelineDiagram,
  ShapesMatrix,
  OwnershipDiagram,
  CodeBlock,
  Footnote,
  Notes,
  Note,
};
