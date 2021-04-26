import * as React from 'react';
import debounce from 'lodash/debounce';
import { useParams } from 'react-router-dom';
// @ts-ignore flow import
import APIContext from '../../common/api-context';
import RepliesSidebar from './RepliesSidebar';

type User = {
    id: string;
    name: string;
    login: string;
    type: 'user';
};

type Annotation = {
    id: string;
    created_at: string;
    created_by: User;
    description: { message: string };
    replies: Array<Message>;
    type: 'annotation';
};

export type Message = {
    id: string;
    // eslint-disable-next-line camelcase
    created_at: string;
    // eslint-disable-next-line camelcase
    created_by: User;
    message: string;
    parent?: {
        id: string;
        type: 'annotation' | 'comment' | 'task';
    };
    type: 'reply' | 'parent';
};

export type Props = {
    currentUser?: object;
    elementId?: string;
    file: object;
    getUserProfileUrl?: Function;
    onCommentDelete: Function;
    onCommentEdit: Function;
};

const mockedReply = {
    id: '123123123',
    created_at: '2021-03-23T11:08:41-07:00',
    created_by: {
        id: '7575210696',
        name: 'Conrad Boxdemo Free',
        login: 'conradchan+free@boxdemo.com',
        type: 'user' as const,
    },
    message: 'This is a reply',
    parent: {
        id: '1210485517',
        type: 'annotation' as const,
    },
    type: 'reply' as const,
} as Message;

const RepliesSidebarContainer = ({ currentUser, elementId, file, ...rest }: Props): JSX.Element => {
    const api = React.useContext(APIContext);
    const { activeFeedEntryId, activeFeedEntryType } = useParams();
    const [isLoading, setIsLoading] = React.useState(false);
    const [item, setItem] = React.useState<Annotation | null>(null);
    const [user, setUser] = React.useState(currentUser);
    const [mentionSelectorContacts, setMentionSelectorContacts] = React.useState<Array<object>>([]);
    const [messages, setMessages] = React.useState<Array<Message>>([]);
    const { id: fileId } = file;

    const handleMentionWithQueryErrorCallback = () => {};
    const handleMentionWithQuerySuccessCallback = ({ entries }: { entries: Array<object> }) => {
        setMentionSelectorContacts(entries);
    };

    const getAvatarUrl = async (userId: string): Promise<string> => {
        return api.getUsersAPI(false).getAvatarUrlWithAccessToken(userId, fileId);
    };

    const getCollaborators = (
        successCallback: () => void,
        errorCallback: () => void,
        searchStr: string,
        { includeGroups = false }: { includeGroups?: boolean } = {},
    ): void => {
        // Do not fetch without filter
        if (!searchStr || searchStr.trim() === '') {
            return;
        }

        api.getFileCollaboratorsAPI(true).getFileCollaborators(fileId, successCallback, errorCallback, {
            filter_term: searchStr,
            include_groups: includeGroups,
            include_uploader_collabs: false,
        });
    };

    const getMentionWithQuery = debounce(
        (searchStr: string) =>
            getCollaborators(handleMentionWithQuerySuccessCallback, handleMentionWithQueryErrorCallback, searchStr),
        500,
    );

    React.useEffect(() => {
        const { permissions } = file;
        const handleFetchAnnotationSuccess = fetchedItem => {
            const {
                id,
                created_at,
                created_by,
                description: { message },
            } = fetchedItem;

            setMessages([
                {
                    id,
                    created_at,
                    created_by,
                    message,
                    type: 'parent' as const,
                },
                mockedReply,
                { ...mockedReply, id: '123123124' },
                { ...mockedReply, id: '123123125' },
                { ...mockedReply, id: '123123126' },
                { ...mockedReply, id: '123123127' },
                { ...mockedReply, id: '123123128' },
                { ...mockedReply, id: '123123129' },
                { ...mockedReply, id: '123123130' },
            ]);

            setIsLoading(false);
        };
        const handleFetchAnnotationError = () => {};

        setIsLoading(true);

        if (activeFeedEntryType === 'annotations') {
            api.getAnnotationsAPI(false).getAnnotation(
                fileId,
                activeFeedEntryId,
                permissions,
                handleFetchAnnotationSuccess,
                handleFetchAnnotationError,
            );
        }
    }, [activeFeedEntryId, activeFeedEntryType, api, file, fileId]);

    React.useEffect(() => {
        if (!fileId) {
            return;
        }

        const handleUserSuccess = (fetchedUser: object) => {
            setUser(fetchedUser);
        };

        if (typeof currentUser === 'undefined') {
            // @ts-ignore flow import
            api.getUsersAPI(false).getUser(fileId, handleUserSuccess);
        }
    }, [api, currentUser, fileId]);

    return (
        <RepliesSidebar
            currentUser={user}
            elementId={elementId}
            fileId={fileId}
            getAvatarUrl={getAvatarUrl}
            getMentionWithQuery={getMentionWithQuery}
            isLoading={isLoading}
            mentionSelectorContacts={mentionSelectorContacts}
            messages={messages}
            {...rest}
        />
    );
};

export default RepliesSidebarContainer;
