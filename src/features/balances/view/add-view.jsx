import styled from 'styled-components';

export function AddView ({ onAdd }) {
  return (
    <form onSubmit={onAdd}>
      <input
        name="name"
        type="text"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}

const Button = styled.button`
  color: blue
`;
