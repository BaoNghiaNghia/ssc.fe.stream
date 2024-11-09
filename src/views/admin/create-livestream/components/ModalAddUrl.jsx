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
    Spinner,
    Text
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

const ModalAddUrl = ({ 
    isOpen,
    onClose,
    handleAddURLVideo,
    loadingAddVideo,
    formik,
    setInputValue
}) => {
    const { t } = useTranslation();
    
    return (    
        <Modal isCentered size="2xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Thêm video từ URL</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize='xs'>Link video:</Text>
                    <Text fontSize='xs'>- Sử dụng link nguồn là <strong>GOOGLE DRIVE</strong> hoặc <strong>YOUTUBE</strong> để livestream</Text>
                    <Text fontSize='xs'>- Thông số video chuẩn: định dạng: <strong>.mp4</strong>, chuẩn nén: <strong>h264</strong>, 
                    chất lượng âm thanh: <strong>128kbs 44100 Hz</strong></Text>
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='md'
                        fontWeight='500'
                        mt='24px'>
                        URL:
                    </FormLabel>
                    <Input
                        name="title_livestream"
                        isRequired={true}
                        // onChange={(e) => setUrl(e.target.value)}
                        onChange={(e) => setInputValue("url", e.target.value)}
                        value={formik.values.url}
                        variant='auth'
                        fontSize='sm'
                        ms={{ base: "0px", md: "0px" }}
                        type='email'
                        placeholder='http:// hoặc https://'
                        fontWeight='500'
                        size='md'
                    />
                    {formik.errors.url && (
                        <p className="text-error">{formik.errors.url}</p>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button variant="outline" size="md" mr={3} onClick={onClose}>Hủy bỏ</Button>
                    <Button 
                        colorScheme='blue'
                        size="md"
                        isDisabled={formik.errors.url}
                        onClick={handleAddURLVideo(formik.values.url)}
                    >{loadingAddVideo ? <Spinner size='sm' color="white"/> : 'Thêm vào danh sách phát'}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

export default ModalAddUrl;