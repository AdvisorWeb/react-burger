import React, {MouseEvent} from 'react';
import {useRef} from 'react'
import { useDrag, useDrop } from 'react-dnd';

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../BurgerConstructor/styles.module.css";

import {TItem} from '../../utils/tsTypes'

interface burgerDraggable {
    deleteItem: (e: MouseEvent<HTMLElement>, key: string, id: string) => void
    item: TItem
    index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
}
type dropElement = {
    index: number
    itemId: string
}

const BurgerConstructorDraggable = ({deleteItem, item, index, moveCard}: burgerDraggable) => {
    const wrapperDrop = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept:  'item',
        hover(item: dropElement, monitor) {
            if (!wrapperDrop.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = wrapperDrop.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;
            if(dragIndex && hoverClientY){
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                moveCard(dragIndex, hoverIndex);
                item.index = hoverIndex;
            }

        },
    });

    const itemId = item._id
    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        item: () => {
            return { itemId, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;

    drag(drop(wrapperDrop));

    return (
        <div
            className={styles.constructorElement}
            ref={wrapperDrop}
            draggable
            onClick={(e) => deleteItem(e, item.key, item._id)}
            style={{opacity}}
        >
            <div className={styles.drag}>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </div>
    );
}

export default BurgerConstructorDraggable;