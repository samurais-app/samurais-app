import { styled } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';
import { shouldForwardProp } from '@mui/system';


const Input = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    padding: 0,
    '& input': {
        background: 'transparent !important',
        padding: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

export default Input;