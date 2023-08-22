import React from 'react';
import { Button } from './styled';

interface FloatingActionButtonProps {
    onClick: () => void;
}

const ButtonFloating: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            +
        </Button>
    );
};

export default ButtonFloating;