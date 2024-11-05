/* eslint-disable */
import React from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

const ModalCustomGeneral = ({ 
    size,
    isOpen,
    onClose,
    title,
    content,
    footer,
    handleConfirm,
    addButton
}) => {
    const { t } = useTranslation();
    
    return (    
        <Modal isCentered size={size ? size : "3xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody style={{ paddingTop: 0 }}>
                    <p>{content}</p>
                </ModalBody>
                {
                    footer ? (
                        <ModalFooter>
                            {
                                addButton ? addButton : null
                            }
                            <Button colorScheme="blue" size="sm" variant="outline" mr={3} onClick={onClose}>Hủy bỏ</Button>
                            <Button 
                                colorScheme='blue'
                                size="sm"
                                onClick={() => handleConfirm()}
                            >Đồng ý</Button>
                        </ModalFooter>
                    ) : null
                }
            </ModalContent>
        </Modal>
    )
};

export default ModalCustomGeneral;