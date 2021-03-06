import { Subscriber, zip, of, interval, race } from 'rxjs';
import { map, take } from 'rxjs/operators';

zip(of(2),of(3)).subscribe({
  next (result) {
    console.log('zip',
      result.reduce((x, y) => x + y, 0)
    );
  },
  error (err) { console.error(err); },
  complete () { console.log('Completed.'); }
});

race(
  interval(3000).pipe(take(1)),
  interval(2000).pipe(take(1), map(() => 2))
).subscribe({
  next (result) { console.log(result); },
  error (err) { console.error(err); },
  complete () { console.log('Completed.'); }
});

/*
  Subscription
  例えば Observable の実行のような、使い捨てのリソースを表します。
  Subscription は unsubscribe というひとつの重要なメソッドを持ち、
  それは引数を取らず、subscription が保有するリソースを捨てるだけです。

  加えて、Subscription は、子の Subscription を
  追加することができる add() メソッドを通じて、グループにまとめられます。
  Subscription が unsubscribe された時には、
  すべての子 (とさらにその子) が同じように unsubscribe されます。
 */

/*
  Subscriber (extends Subscription)
  Observer インターフェースを実装し、Subject クラスを継承しています。
  Observer が Observable の値を消費するための public API であるのに対し、
  例えば unsubscribe メソッドのように、Subscription のような機能を提供するために、
  すべての Observer が Subscriber に変換されます。
  Subscriber は RxJS において汎用的な型であり、オペレータの実装において重要な役割を担っていますが、
  public API として利用されることは稀です。
 */

/*
const subscriber = new Subscriber<number>(
    (value) => console.log('Next: ' + value),
    (error) => console.error(error),
    () => console.log('Completed.'));

subscriber.next(1);
subscriber.next(2);
// subscriber.error(new Error('いyarn'));
// subscriber.complete();
// subscriber.unsubscribe();
subscriber.next(3);
*/

/*
  TeardownLogic
  This interface describes what should be returned by function passed to Observable constructor
  or static create function.
  Value of that interface will be used to cancel subscription for given Observable.

  TeardownLogic can be:

  1. Function
    Function that takes no parameters. When consumer of created Observable calls unsubscribe,
    that function will be called.

  2. AnonymousSubscription
    AnonymousSubscription is simply an object with unsubscribe method on it.
    That method will work the same as function.

  3. void
    If created Observable does not have any resources to clean up,
    function does not have to return anything.
 */

/*
subscriber.add(() => {
  console.log('Teardown Logic');
});
*/

/*
  Observable<T>
  A representation of any set of values over any amount of time.
  This is the most basic building block of RxJS.
 */

/*
  Subject (extends Observable)
  A Subject is a special type of Observable that allows values to be multicasted to
  many Observables. Subjects are like EventEmitters.
 */

/*
  SubjectSubscriber (extends Subscriber)
  constructor がオーバーライドされているだけで、他の仕様は Subscriber 同様
 */

/*
class Func<A, B, C> {  // 関数: A -> B -> C
  constructor(
    private arg1: LazyArg<A>,
    private arg2: LazyArg<B>,
    private innerFunc: (arg1: LazyArg<A>, arg2: LazyArg<B>) => Promise<C>
  ) {}

  async call() {
    return await this.innerFunc(this.arg1, this.arg2);
  }
}

class LazyArg<T> {  // T: 評価結果の型
  constructor(
    private expr: () => Promise<T>
  ) {}

  // 正格評価
  async force() {
    return await this.expr();
  }
}

const arg1 = new LazyArg<number>(async () => Promise.resolve(add(1, 2)));
const arg2 = new LazyArg<number>(async () => Promise.resolve(add(3, 4)));
const func = new Func<number, number, number[]>(arg1, arg2, async (arg1, arg2) => {
  return [await arg1.force(), await arg2.force()];
});

func.call().then(result => console.log(result)).catch(err => console.error(err));

function add(x: number, y: number): number {
  console.log(`Evaluated: ${x} + ${y}`);
  return x + y;
}
*/
