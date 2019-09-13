import {Program} from './Program';
import {AttachmentRequest} from './AttachmentRequest';
import {AttachmentResponse} from './AttachmentResponse';
import {_Request} from './_Request';

export const enum RESP_STATUS_TYPE {
    _onProcess = 2,
    _open = 1,
    _closed = 3
}

export class _Response {

    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status_response: number,
        public type: number,
        public request_id: number,
        public user_id: number,
        public user_email: string,
        public attachments?: Array<AttachmentResponse>,
        public request?: _Request,
        public created_at?: string,
    ) {
    }
}
