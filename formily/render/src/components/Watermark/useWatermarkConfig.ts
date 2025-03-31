import { useEffect, useState } from 'react';
import type { TGqlApi } from 'low-code-graphql';
import { WatermarkProps } from './index';

/** 根据表单id获取水印配置数据 */
export function useWatermarkConfig(api: TGqlApi, id: string) {
  const [watermarkConfig, setWatermarkConfig] = useState<WatermarkProps>({});

  const getWatermarkById = async (idWatermark: string) => {
    try {
      const res = await api.lowcode.getWatermarkById({ idWatermark });
      const watermark = res.data?.getWatermarkById;
      setWatermarkConfig(JSON.parse(watermark?.exConfig || '{}'));
    } catch (err) {}
  };

  useEffect(() => {
    if (id) {
      getWatermarkById(id);
    }
  }, [id]);

  return watermarkConfig;
}
