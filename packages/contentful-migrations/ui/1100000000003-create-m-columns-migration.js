const { withHelpers } = require('@jungvonmatt/contentful-migrations');

module.exports = withHelpers(async (migration, _context, helpers) => {
  const defaultLocale = await helpers.locale.getDefaultLocale();

  const mColumns = migration
    .createContentType('m-columns')
    .name('Module: Columns')
    .description('Helper for two column layouts')
    .displayField('internal_name');

  mColumns
    .createField('internal_name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  mColumns
    .createField('theme')
    .name('Theme')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['light', 'dark'],
      },
    ])
    .disabled(true)
    .omitted(true);

  mColumns
    .createField('spacing')
    .name('Spacing')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['none', 'sm', 'md', 'lg'],
      },
    ])
    .defaultValue({
      [defaultLocale.code]: 'md',
    })
    .disabled(false)
    .omitted(false);

  mColumns.changeFieldControl('theme', 'builtin', 'dropdown', {
    helpText: 'light: Light background, dark text; dark: Dark background, light text.',
  });
  mColumns.changeFieldControl('spacing', 'builtin', 'dropdown', {});

  mColumns
    .createField('layout')
    .name('Layout')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['default'],
      },
    ])
    .defaultValue({
      [defaultLocale.code]: 'default',
    })
    .disabled(true)
    .omitted(true);

  mColumns
    .createField('column_left')
    .name('Column left')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 1,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['c-editorial', 'c-responsive-media'],
        },
      ],
      linkType: 'Entry',
    });

  mColumns
    .createField('column_right')
    .name('Column right')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 1,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['c-editorial', 'c-responsive-media'],
        },
      ],
      linkType: 'Entry',
    });

  mColumns.changeFieldControl('internal_name', 'builtin', 'singleLine', {
    helpText: 'e.g. "Home page > Columns"',
  });

  mColumns.changeFieldControl('theme', 'builtin', 'dropdown', {});

  mColumns.changeFieldControl('spacing', 'builtin', 'dropdown', {});

  mColumns.changeFieldControl('layout', 'builtin', 'dropdown', {});

  mColumns.changeFieldControl('column_left', 'builtin', 'entryLinksEditor', {});

  mColumns.changeFieldControl('column_right', 'builtin', 'entryLinksEditor', {});
});
