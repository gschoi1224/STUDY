export type FileNameAndNumber = [string, number];

export const getFileNameAndNumber = (
    defaultfilename: string,
    defaultNumberOffakeData: number,
): FileNameAndNumber => {
    const [bin, node, filename, numberOffakeData] = process.argv;
    return [
        filename || defaultfilename,
        numberOffakeData
            ? parseInt(numberOffakeData, 10)
            : defaultNumberOffakeData,
    ];
};
