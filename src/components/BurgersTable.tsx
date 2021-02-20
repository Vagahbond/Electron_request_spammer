import React from 'react';
import Burger from '../interfaces/Burger';

interface IProps {
  burgersScores: Burger[];
}
export default function BurgersTable({ burgersScores }: IProps) {
  return (
    <>
      <table width="350px">
        <thead>
          <tr>
            <th style={{ width: '100px' }}>Name</th>
            <th style={{ width: '100px' }}>Likes</th>
          </tr>
        </thead>
        <tbody>
          {burgersScores.map((score) => (
            <tr key={score.name}>
              <td>{score.name}</td>
              <td style={{ textAlign: 'end' }}>{score.nbLikes || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
