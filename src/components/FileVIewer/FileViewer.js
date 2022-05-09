import React, { useState } from "react";
import styled from "styled-components";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { File } from "./File";
import { useSpring, animated } from "react-spring";

const COMPONENTS = [
  "first.js",
  "second.js",
  "third.js",
  "fourth.exe",
  "fifth.doc",
  "six.txt"
];

const files = [
  new File(
    "src",
    [
      new File(
        "components",
        [...COMPONENTS].map((comp) => new File(comp, [], "file")),
        "directory"
      ),
      new File("App.js", [], "file")
    ],
    "directory"
  )
];

const FileViewer = () => {
  return (
    <Wrapper>
      <FileViewerContainer>
        {files.map((file, index) => {
          return <FilesViewer file={file} key={index} level={0} />;
        })}
      </FileViewerContainer>
    </Wrapper>
  );
};

const FilesViewer = ({ file, level }) => {
  const { fileType, childFiles, fileName } = file;
  const [expanded, setExpanded] = useState(false);
  const onToggle = () => {
    setExpanded((ex) => !ex);
  };
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return (
    <>
      <FilesContainer {...props} paddingLeft={`${(level + 1) * 2}rem`}>
        {fileType === "directory" && (
          <IconContainer onClick={onToggle}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconContainer>
        )}
        <FileTitle>{fileName}</FileTitle>
      </FilesContainer>
      {childFiles.length > 0 && expanded && (
        <>
          <animated.div style={props}>
            {childFiles.map((childFile, index) => {
              return (
                <FilesViewer file={childFile} key={index} level={level + 1} />
              );
            })}
          </animated.div>
        </>
      )}
    </>
  );
};

const IconContainer = styled.div`
  align-self: center;
  cursor: pointer;
`;

const ExpandLessIcon = styled(MdExpandLess)`
  width: 2rem;
  align-self: center;
`;

const ExpandMoreIcon = styled(MdExpandMore)`
  width: 2rem;
  align-self: center;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileViewerContainer = styled.div`
  width: 60vw;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  background: hsl(210deg, 30%, 8%);
  border: 1px solid hsl(210deg, 15%, 20%);
  border-radius: 1rem;
  color: #e9dd78;
  overflow-y: auto;
  justify-content: center;
`;

const FilesContainer = styled.div`
  width: fit-content;
  height: 3rem;
  padding-left: ${(props) => props?.paddingLeft ?? 0};
  display: flex;
  flex-direction: row;
`;

const FileTitle = styled.div`
  font-size: x-large;
  align-self: center;
`;

export default FileViewer;
