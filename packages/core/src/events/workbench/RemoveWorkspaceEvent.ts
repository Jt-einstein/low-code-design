import { ICustomEvent } from 'low-code-shared';
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent';

export class RemoveWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = 'remove:workspace';
}
