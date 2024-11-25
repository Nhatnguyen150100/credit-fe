import React, { useEffect, useState } from 'react';

interface SvgIconProps {
    src: string; // Đường dẫn đến file SVG (từ public/svg)
    alt?: string; // Thuộc tính alt cho icon
    width?: string; // Kích thước chiều rộng
    height?: string; // Kích thước chiều cao
    color?: string; // Màu sắc cho icon
}

const SvgIcon: React.FC<SvgIconProps> = ({ src, width = '24px', height = '24px', color = 'currentColor' }) => {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        fetch(src)
            .then(response => response.text())
            .then(svg => {
                // Thay đổi màu sắc trong SVG
                const coloredSvg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
                setSvgContent(coloredSvg);
            })
            .catch(error => console.error('Error loading SVG:', error));
    }, [src, color]);

    return (
        <div
            style={{ width, height }}
            dangerouslySetInnerHTML={{ __html: svgContent || '' }}
        />
    );
};

export default SvgIcon;