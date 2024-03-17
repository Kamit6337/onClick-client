import { useMutation, useQuery } from "@tanstack/react-query";
import { downloadReq } from "../../utils/api/downloadApi";
import { useEffect, useState } from "react";

const DownloadImage = (para) => {
  const [startDownload, setStartDownload] = useState(false);

  const [params, setParams] = useState(null);

  const handleDownloadImage = (data) => {
    setParams(data);
  };

  const query = useQuery({
    queryKey: ["downloadImage", para],
    queryFn: () => downloadReq("/image", { ...params }),
    staleTime: Infinity,
    enabled: false,
  });

  return { handleDownloadImage, ...query };
};

export default DownloadImage;
