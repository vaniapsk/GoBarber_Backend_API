import { container } from 'tsyringe';

// import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
// container.registerSingleton<IMailProvider>('MailProvider', DiskStorageProvider);
