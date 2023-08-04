import { styled } from '@mui/material/styles';
import Item from './Item.js';

const BoldItem = styled(Item)(({ theme }) => ({
    fontWeight: 'bold',
}));

export default BoldItem;