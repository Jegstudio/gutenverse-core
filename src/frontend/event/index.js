import { ReinitHandler } from './reinit';

class GutenverseEvent {
    constructor() {
        this.status = false;
        // Add default events.
        this.events = {
            'gutenverse:reinit': [ReinitHandler],
        };
        const init = () => {
            this._defaultEvents();
            this._listen();
            window.removeEventListener('GutenverseEventReady', init);
        };
        window.addEventListener('GutenverseEventReady', init);
        window.GutenverseEvent = this;
    }

    _defaultEvents() {
        if (!window.GutenverseEventList || window.GutenverseEventList?.length === 0) {
            window.GutenverseEventList = {};
        }
        Object.keys(window.GutenverseEventList).forEach((event) => {
            this.events[event] = [
                ...(this.events?.[event] ? this.events[event] : []),
                ...window.GutenverseEventList[event]
            ];
        });

        delete window.GutenverseEventList;
    }

    _detachAllEvents() {
        Object.keys(this.events).forEach((eventName) => {
            window.dispatchEvent(new CustomEvent(`${eventName}:detach`));
        });
        this.status = false;
    }

    _listen() {
        Object.keys(this.events).forEach((event) => {
            const handleWrapper = (customEvent) => {
                const {
                    detail = {},
                    currentTarget = null
                } = customEvent;

                const handlers = this.events[event] || [];
                handlers.forEach((handler) => handler(detail, currentTarget));
            };
            window.addEventListener(event, handleWrapper);
            window.addEventListener(`${event}:detach`, function() {
                window.removeEventListener(`${event}`, handleWrapper);
                window.removeEventListener(`${event}:detach`, this);
            });
        });
        window.dispatchEvent(
            new CustomEvent(
                'GutenverseEventInit',
                {detail: {status: true}}
            )
        );
        this.status = true;
    }

    detach(eventName, checkHandle) {
        const handlers = (this.events[eventName] || []).filter(handler => handler !== checkHandle);
        if (handlers.length === 0) {
            window.dispatchEvent(new CustomEvent(`${eventName}:detach`));
            return;
        }
        this.events[eventName] = handlers;
    }

    restart() {
        this._detachAllEvents();
        this._listen();
    }

    dispatch(eventName, data) {
        window.dispatchEvent(new CustomEvent(eventName, {
            detail: data,
        }));
    }
}

new GutenverseEvent();