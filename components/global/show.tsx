
import React, { ReactNode, Children, isValidElement } from "react";

interface ShowProps {
  children: ReactNode;
}

interface WhenProps {
  isTrue: boolean;
  children: ReactNode;
}

interface ElseProps {
  render?: ReactNode;
  children: ReactNode;
}

/**
 * Show Component
 *
 * A wrapper component that renders one of its children based on a condition.
 *
 * It works by iterating over its children and looking for a child with the `isTrue` prop.
 * If a child with `isTrue={true}` is found, it is rendered.
 * If no such child is found, it renders the child without the `isTrue` prop (fallback child).
 *
 * ### Props:
 * - `children`: ReactNode - The children passed to this component. At least one child should have an `isTrue` prop,
 *    and one child without it can serve as a fallback.
 *
 * ### Usage Example:
 *
 * ```tsx
 * <Show>
 *   <Show.When isTrue={false}>This will not render</Show.When>
 *   <Show.When isTrue={true}>This will render</Show.When>
 *   <Show.Else>This will render if none of the above is true</Show.Else>
 * </Show>
 * ```
 *
 * In this example, the second `Show.When` will be rendered because `isTrue={true}`.
 * If none of the `isTrue` conditions are satisfied, the `Show.Else` will render the fallback.
 *
 * @param {ShowProps} props - The component props.
 * @returns The first child with `isTrue={true}` or the fallback child.
 */
interface ShowComponent extends React.FC<ShowProps> {
  When: React.FC<WhenProps>;
  Else: React.FC<ElseProps>;
}

export const Show: ShowComponent = ({ children }) => {
  let when: ReactNode = null;
  let otherwise: ReactNode = null;

  // Iterating through children to find 'when' or 'otherwise'
  Children.forEach(children, child => {
    if (isValidElement(child)) {
      const { isTrue } = child.props;

      // If isTrue is undefined, it is considered the fallback option
      if (isTrue === undefined) {
        otherwise = child;
      }
      // If isTrue is true, set it as the conditionally rendered child
      else if (!when && isTrue) {
        when = child;
      }
    }
  });

  return <>{when || otherwise}</>;
};

/**
 * ConditionalRender.When
 *
 * A subcomponent that renders its children if `isTrue` is `true`.
 *
 * ### Props:
 * - `isTrue`: boolean - Condition to determine whether the children should render.
 * - `children`: ReactNode - The content to render if the condition is true.
 */
Show.When = ({ isTrue, children }: WhenProps) => (isTrue ? children : null);
Show.When.displayName = "Show.When";

/**
 * Show.Else
 *
 * A subcomponent that renders its children or the `render` prop as fallback.
 *
 * ### Props:
 * - `render`: ReactNode (optional) - Custom content to render as fallback. If not provided, `children` is rendered.
 * - `children`: ReactNode - Fallback content to render.
 */
Show.Else = ({ render, children }: ElseProps) => render || children;
Show.Else.displayName = "Show.Else";

export default Show;
