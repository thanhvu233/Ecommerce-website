export default function getParams(pathname) {
    // Convert pathname to array
    let path = pathname.split('/');
    path = path.slice(2, path.length);

    return path;
}
