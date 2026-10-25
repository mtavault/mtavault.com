const variant = 'soft';

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'clay',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'neutral',
    },
    icons: {
      arrowDown: 'fas:arrow-down',
      arrowLeft: 'fas:arrow-left',
      arrowRight: 'fas:arrow-right',
      arrowUp: 'fas:arrow-up',
      check: 'fas:check',
      chevronDoubleLeft: 'fas:chevrons-left',
      chevronDoubleRight: 'fas:chevrons-right',
      chevronDown: 'fas:chevron-down',
      chevronUp: 'fas:chevron-up',
      chevronLeft: 'fas:chevron-left',
      chevronRight: 'fas:chevron-right',
      close: 'fas:xmark',
    },
    header: {
      slots: {
        root: 'backdrop-blur-md',
      },
    },

    button: {
      defaultVariants: {
        variant,
      },
    },
    input: {
      defaultVariants: {
        variant,
      },
    },
    select: {
      defaultVariants: {
        variant,
      },
    },
    textarea: {
      defaultVariants: {
        variant,
      },
    },
    selectMenu: {
      defaultVariants: {
        variant,
      },
    },
    inputMenu: {
      defaultVariants: {
        variant,
      },
    },
    inputNumber: {
      defaultVariants: {
        variant,
      },
    },
    inputTags: {
      defaultVariants: {
        variant,
      },
    },
    inputDate: {
      defaultVariants: {
        variant,
      },
    },
    inputTime: {
      defaultVariants: {
        variant,
      },
    },
    pinInput: {
      defaultVariants: {
        variant,
      },
    },
    pageHero: {
      slots: {
        container: 'py-16! gap-4!',
      },
    },
    footer: {
      slots: {
        root: 'bg-muted pt-32',
      },
    },
  },
});
