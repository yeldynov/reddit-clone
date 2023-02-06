import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import React, { useRef } from 'react';

type Props = {
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
};

export default function ImageUpload({
  selectedFile,
  setSelectedFile,
  onSelectImage,
  setSelectedTab,
}: Props) {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex direction='column' justify='center' align='center' width='100%'>
      {selectedFile ? (
        <>
          <Image src={selectedFile} maxWidth='400px' maxHeight='400px' />
          <Stack direction='row' mt={4}>
            <Button height='28px' onClick={() => setSelectedTab('Post')}>
              Back to Post
            </Button>
            <Button
              variant='outline'
              height='28px'
              onClick={() => setSelectedFile('')}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify='center'
          align='center'
          p={20}
          border='1px dashed'
          borderColor='gray.200'
          width='100%'
          borderRadius={4}
        >
          <Button
            variant='outline'
            height='28px'
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={selectedFileRef}
            type='file'
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
}
