export * from './editEventTimerActions';

export const fontFamilies = [
    'San Francisco',
    'Typewriter',
    'Avenir Next',
    'Courier New',
    'Noteworthy',
    'Georgia',
    'Papyrus',
    'Snell Roundhand'
];

export const repeatPickerValues = {
    amounts: Array(101).fill('').map((_, index) => `${index}`),
    labels: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years']
};

export const eventContextMenuItems = [
    {
        actionKey: 'edit',
        actionTitle: 'Edit',
        icon: {
            type: 'IMAGE_SYSTEM',
            imageValue: {
                systemName: 'square.and.pencil'
            }
        }
    },
    {
        actionKey: 'share',
        actionTitle: 'Share',
        icon: {
            type: 'IMAGE_SYSTEM',
            imageValue: {
                systemName: 'square.and.arrow.up'
            }
        }
    },
    {
        menuTitle: '',
        menuOptions: ['displayInline'],
        menuItems: [{
            actionKey: 'delete',
            actionTitle: 'Delete',
            menuAttributes: ['destructive'],
            icon: {
                type: 'IMAGE_SYSTEM',
                imageValue: {
                    systemName: 'trash'
                }
            }
        }]
    }
];
