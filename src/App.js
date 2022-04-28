import React, { Fragment, useState, useCallback } from 'react';
import './style.css';

const List = ({ items }) => {
  const [datas, setData] = useState(items);
  const [selectedItem, setSelectedItem] = useState([]);

  const markItem = useCallback(
    (item, i) => {
      const tmp = [...datas];
      tmp[i] = { ...tmp[i], isSelected: !tmp[i].isSelected };
      setData(tmp);
      let selectedItemTmp = [];
      if (item.isSelected) {
        selectedItemTmp = selectedItem.filter(
          (selected) => selected !== item.name
        );
      } else {
        selectedItemTmp = [...selectedItem, item.name];
      }
      setSelectedItem(selectedItemTmp);
    },
    [datas, selectedItem]
  );

  return (
    <Fragment>
      {selectedItem.length > 0 && (
        <div>
          <h2>Selected item</h2>
          <ul className="List selected-wrapper">
            {selectedItem.map((selected, i) => {
              return (
                <li key={i} className="List__item selected">
                  {selected}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <ul className="List">
        {datas.map((item, i) => (
          <li
            onClick={() => markItem(item, i)}
            key={item.name}
            className={`List__item List__item--${item.color} ${
              item.isSelected ? `active` : ``
            }`}
          >
            {item.name}
            <span className="mark" />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = [
  'navy',
  'blue',
  'aqua',
  'teal',
  'olive',
  'green',
  'lime',
  'yellow',
  'orange',
  'red',
  'maroon',
  'fuchsia',
  'purple',
  'silver',
  'gray',
  'black',
];
const fruits = [
  'apple',
  'banana',
  'watermelon',
  'orange',
  'peach',
  'tangerine',
  'pear',
  'kiwi',
  'mango',
  'pineapple',
];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color, isSelected) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
              isSelected: false,
            },
          ],
          []
        ),
      ],
      []
    ),
  ],
  []
);

export default function App() {
  return <List items={items} />;
}
