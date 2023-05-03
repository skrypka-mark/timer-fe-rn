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

export const eventContextMenuItems = [
    {
        actionKey: 'key-01',
        actionTitle: 'Edit',
        icon: {
            type: 'IMAGE_SYSTEM',
            imageValue: {
                systemName: 'square.and.pencil'
            }
        }
    },
    {
        actionKey: 'key-02',
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
            actionKey: 'key-03',
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
