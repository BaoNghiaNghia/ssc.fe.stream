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
    ModalCloseButton
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

const ModalPackageConfirm = ({ 
    isOpen,
    onClose,
    // handleAddURLVideo,
    // formik,
    // setInputValue
}) => {
    const { t } = useTranslation();
    return (    
        <Modal isCentered size="3xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Thêm video từ URL</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p>Sử dụng link video Youtube để tạo Livestream.</p>
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='xl'
                        fontWeight='500'
                        mt='24px'>
                        URL:
                    </FormLabel>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>Hủy bỏ</Button>
                    <Button 
                        colorScheme='blue'
                    >Thêm vào danh sách phát</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

export default ModalPackageConfirm;