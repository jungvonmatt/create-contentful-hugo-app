module.exports = function (migration) {
  const cMenu = migration.createContentType('c-menu').name('Component: Menu').description('').displayField('name');
  cMenu
    .createField('name')
    .name('Internal name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  cMenu
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  cMenu
    .createField('entries')
    .name('Entries')
    .type('Array')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['c-link', 'page', 'x-folder'],
        },
      ],
      linkType: 'Entry',
    });

  cMenu.changeFieldControl('name', 'builtin', 'singleLine', {});
  cMenu.changeFieldControl('title', 'builtin', 'singleLine', {});
  cMenu.changeFieldControl('entries', 'builtin', 'entryLinksEditor', {});

  const page = migration.editContentType('page');
  page
    .createField('menu')
    .name('Submenu')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['c-menu'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry');

  page.moveField('menu').beforeField('content');
  page.changeFieldControl('menu', 'builtin', 'entryLinkEditor', {});
};
