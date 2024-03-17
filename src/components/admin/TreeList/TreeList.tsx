"use client"
import React, {FC, useRef, useState} from 'react';
import "./TreeList.scss"
import {useDrag, useDrop} from 'react-dnd';

type CategoryProps = {
    data: any;
    onFolderClick: (item: any) => void;
    onMoveItem: (dragId: string, hoverId: string) => void;
};

const TreeList: FC<CategoryProps> = ({data, onFolderClick, onMoveItem}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const handleClick = () => onFolderClick(data);

    const ItemType = 'TREE_ITEM';
    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: ItemType,
        item: {id: data.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: ItemType,
        hover(item: { id: string }) {

        },
        drop(item: { id: string }, monitor) {
            if (item.id !== data.id) {
                console.log("item", item.id)
                onMoveItem(item.id, data.id);
            }
        },
    }));

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}  className="wrapper-tree-list">
            <div className="wrapper-resuly-tree-list">
                {data.children.length > 0 ?
                    <div className="open-tree" onClick={toggle}>
                        {isOpen ? '[-]' : '[+]'}
                    </div> : null}
                <div className="name-tree" onClick={handleClick}>
                    {data.translations[0].name}
                </div>
            </div>
            {isOpen && data.children && (
                <div style={{paddingLeft: '20px'}}>
                    {data.children.map((child: any) => (
                        <TreeList key={child.id} data={child} onFolderClick={onFolderClick} onMoveItem={onMoveItem}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeList;


