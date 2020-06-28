import { container } from 'tsyringe';

import IHashProvider from './Hashprovider/models/IHashProvider';
import BCryptHashProvider from './Hashprovider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
