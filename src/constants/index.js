export * from './editEventTimerActions';
import moment from 'moment';

export const fontFamilies = [
    // 'San Francisco',
    // 'Akris Lancead',
    'System',
    'EightBits',
    // 'Typewriter',
    // 'Leaping Typewriter',
    'Courier New',
    // 'Countryhouse',
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
        actionKey: 'show_in_widget',
        actionTitle: 'Set for widget',
        icon: {
            type: 'IMAGE_SYSTEM',
            imageValue: {
                systemName: 'square.stack.3d.up'
            }
        }
    },
    // {
    //     actionKey: 'notification',
    //     actionTitle: 'Notification',
    //     menuState: 'on',
    //     icon: {
    //         type: 'IMAGE_SYSTEM',
    //         imageValue: {
    //             systemName: 'bell'
    //         }
    //     }
    // },
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

export const getEventContextMenuTitle = event => {
    if(!event?.createdAt) return '';

    const date = moment(event.createdAt, 'DD-MM-YYYY', true);
    if(!date.isValid()) return '';

    return `Created: ${date.format('LL')}`;
};
