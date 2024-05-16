import React from 'react';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';

const ResizableAndDraggableContainer = ({ containerNo }) => {
    return (
        <Draggable>
            <Resizable
                defaultSize={{ width: 200, height: 200 }}
                style={{
                    border: '1px solid #ddd',
                    background: '#f0f0f0',
                    overflow: 'hidden',
                }}
            >
                <div
                    className='w-full h-full flex items-center justify-center'
                >
                    Component {containerNo}
                </div>
            </Resizable>
        </Draggable>
    );
};

export default ResizableAndDraggableContainer;
