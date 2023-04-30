import React from 'react';
import styles from '../../css/app.module.css';

export const KeyValueTable = ({item}) => {
  const rows = Object.keys(item).map((key) => ({key: key, value: item[key]}));

  return (
    <table className={`${styles.smoothTable} ${styles.capitalize}`}>
      <tbody>
      {rows.map((row) => (
        <tr key={`${item.id}${row.key}`}>
          <td>{row.key}</td>
          <td>
            {typeof row.value === 'string' && row.value.startsWith('data:image/') ? (
              <img src={row.value} alt={row.key} style={{width: 100, height: 100}}/>
            ) : (
              row.value
            )}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};