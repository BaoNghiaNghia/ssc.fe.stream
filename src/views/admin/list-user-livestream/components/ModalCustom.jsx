/* eslint-disable */
import React, { useState } from 'react'
import {
    Button,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Spinner
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

const ModalStreamVideo = ({ 
    size,
    isOpen,
    onClose,
    title,
    content,
    footer,
    handleConfirm
}) => {
    const { t } = useTranslation();
    
    return (    
        <Modal isCentered size={size ? size : "4xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p>{content}</p>
                </ModalBody>
                {
                    footer ? (
                        <ModalFooter>
                            <Button colorScheme="blue" size="sm" variant="outline" mr={3} onClick={onClose}>Hủy bỏ</Button>
                            <Button 
                                colorScheme='blue' size="sm"
                                onClick={() => handleConfirm()}
                            >Đồng ý</Button>
                        </ModalFooter>
                    ) : null
                }
            </ModalContent>
        </Modal>
    )
};

export default ModalStreamVideo;