export function getApiUrlClient(path) {
  return process?.env.NODE_ENV === 'development' ? `${path}` : 'path';
}
