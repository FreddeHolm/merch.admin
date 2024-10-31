// ./components/PriceMatrixInput.js
import React from 'react';
import { useFormValue } from '@sanity/react-hooks';
import { TextInput, Grid, Card, Box } from '@sanity/ui';

const PriceMatrixInput = React.forwardRef((props, ref) => {
  const { type, onChange, value = [] } = props;

  const handleSizeChange = (index, newSize) => {
    const updatedValue = [...value];
    updatedValue[index].size = newSize;
    onChange({ patch: { set: updatedValue } });
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedValue = [...value];
    updatedValue[index].quantity = newQuantity;
    onChange({ patch: { set: updatedValue } });
  };

  const handlePriceChange = (index, newPrice) => {
    const updatedValue = [...value];
    updatedValue[index].price = newPrice;
    onChange({ patch: { set: updatedValue } });
  };

  return (
    <Box>
      <Grid columns={3} gap={3}>
        <Card padding={2}>
          <strong>Size</strong>
        </Card>
        <Card padding={2}>
          <strong>Quantity</strong>
        </Card>
        <Card padding={2}>
          <strong>Price</strong>
        </Card>
      </Grid>

      {value.map((entry, index) => (
        <Grid columns={3} gap={3} key={index}>
          <Card padding={2}>
            <TextInput
              value={entry.size}
              onChange={(event) => handleSizeChange(index, event.target.value)}
            />
          </Card>
          <Card padding={2}>
            <TextInput
              value={entry.quantity}
              onChange={(event) => handleQuantityChange(index, event.target.value)}
              type="number"
            />
          </Card>
          <Card padding={2}>
            <TextInput
              value={entry.price}
              onChange={(event) => handlePriceChange(index, event.target.value)}
              type="number"
            />
          </Card>
        </Grid>
      ))}

      <Card padding={2}>
        <button
          type="button"
          onClick={() =>
            onChange({
              patch: {
                set: [...value, { size: '', quantity: 0, price: 0 }],
              },
            })
          }
        >
          Add Row
        </button>
      </Card>
    </Box>
  );
});

export default PriceMatrixInput;