import React, { Suspense, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Responsive from '../components/common/Responsive';
// import EditorContainer from '../containers/write/EditorContainer';
// import TagBoxContainer from '../containers/write/TagBoxContainer';
// import WriteActionButtonsContainer from '../containers/write/WriteActionButtonContainer';

const EditorContainer = React.lazy(() =>
    import('../containers/write/EditorContainer'),
);
const TagBoxContainer = React.lazy(() =>
    import('../containers/write/TagBoxContainer'),
);
const WriteActionButtonsContainer = React.lazy(() =>
    import('../containers/write/WriteActionButtonContainer'),
);

const WritePage = () => {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    return (
        <Responsive>
            <Helmet>
                <title>글 작성하기 - REACTERS</title>
            </Helmet>
            <Suspense fallback={<div>loading...</div>}>
                {visible1 && <EditorContainer />}
            </Suspense>
            <Suspense fallback={<div>loading...</div>}>
                {visible2 && <TagBoxContainer />}
            </Suspense>
            <Suspense fallback={<div>loading...</div>}>
                {visible3 && <WriteActionButtonsContainer />}
            </Suspense>
            <button onClick={() => setVisible1(prev => !prev)}>
                EditorContainer
            </button>
            <button onClick={() => setVisible2(prev => !prev)}>
                TagBoxContainer
            </button>
            <button onClick={() => setVisible3(prev => !prev)}>
                WriteActionButtonsContainer
            </button>
        </Responsive>
    );
};

export default WritePage;
