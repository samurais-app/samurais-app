import { SchematicsRunner } from '@samurais-app/command-lib';
import { Runner, RunnerFactory } from 'src/lib/runners';
import { AbstractCollection } from './abstract.collection';
import { Collection } from './collection';
import { CustomCollection } from './custom.collection';
import { SamuraisCollection } from './samurais.collection';


export class CollectionFactory {
    public static create(collection: Collection | string): AbstractCollection {
        switch (collection) {
        case Collection.SAMURAIS:
            return new SamuraisCollection(
          RunnerFactory.create(Runner.SCHEMATICS) as SchematicsRunner,
            );

        default:
            return new CustomCollection(
                collection,
          RunnerFactory.create(Runner.SCHEMATICS) as SchematicsRunner,
            );
        }
    }
}