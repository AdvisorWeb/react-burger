import React from 'react';
import {useRef} from 'react'
import { useDrag, useDrop } from 'react-dnd';

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../BurgerConstructor/styles.module.css";

import PropTypes from "prop-types";
import {productProp} from '../../utils/variablePropType'

const BurgerConstructorDraggable = ({deleteItem, item, index, moveCard}) => {
    const wrapperDrop = useRef(null);
    const [, drop] = useDrop({
        accept:  'item',
        hover(item, monitor) {
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
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
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

BurgerConstructorDraggable.propTypes = {
    deleteItem: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    index:PropTypes.number.isRequired,
    item: productProp.isRequired,
};

export default BurgerConstructorDraggable;