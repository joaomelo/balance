import { createRepositoryService } from './service';

export async function createRepositoryServiceFactory ({ firebaseApp, projectId, firestoreEmulatorHost }) {
  return (name, config) => createRepositoryService(name, config, firestore);
}
