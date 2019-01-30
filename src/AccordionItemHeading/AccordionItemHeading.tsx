import { default as classnames } from 'classnames';
import * as React from 'react';
import { getClosestElement } from '../helpers/getClosestElement';
import { UUID } from '../ItemContainer/ItemContainer';

type AccordionItemHeadingProps = React.HTMLAttributes<HTMLDivElement> & {
    expandedClassName: string;
    expanded: boolean;
    uuid: UUID;
    disabled: boolean;
    setExpanded(uuid: UUID, expanded: boolean): void;
};

type AccordionItemHeadingState = {};

export default class AccordionItemHeading extends React.Component<
    AccordionItemHeadingProps,
    AccordionItemHeadingState
> {
    handleClick = (): void => {
        const { uuid, expanded, setExpanded } = this.props;

        setExpanded(uuid, !expanded);
    };

    handleKeyPress = (evt: React.KeyboardEvent<HTMLDivElement>): void => {
        const keyCode = evt.which.toString();

        if (keyCode === '13' || keyCode === '32') {
            evt.preventDefault();
            this.handleClick();
        }

        if (['36', '35'].indexOf(keyCode) !== -1) {
            const parentAccordion = getClosestElement(
                evt.target,
                '[data-accordion-component="Accordion"]',
            );

            const accordionItems = parentAccordion
                ? parentAccordion.querySelectorAll(
                      '[data-accordion-component="AccordionItemHeading"]',
                  )
                : null;

            if (!accordionItems.length) {
                return;
            }

            evt.preventDefault();

            if (keyCode === '36') {
                // home
                accordionItems[0].focus();
            }

            if (keyCode === '35') {
                // end
                accordionItems[accordionItems.length - 1].focus();
            }
        }
    };

    render(): JSX.Element {
        const {
            className,
            expandedClassName,
            setExpanded,
            expanded,
            uuid,
            disabled,
            ...rest
        } = this.props;

        const id = `accordion__heading-${uuid}`;
        const ariaControls = `accordion__panel-${uuid}`;

        const headingClassName = classnames(className, {
            [expandedClassName]: expandedClassName && expanded,
        });

        return (
            <div
                id={id}
                aria-expanded={expanded}
                aria-controls={ariaControls}
                className={headingClassName}
                aria-disabled={disabled}
                onClick={this.handleClick}
                role="button"
                tabIndex={0}
                data-accordion-component="AccordionItemHeading"
                onKeyDown={this.handleKeyPress}
                {...rest}
            />
        );
    }
}
