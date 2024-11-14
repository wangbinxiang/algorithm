class MyPromise {
  value: any;
  error: any;
  status: string;


  constructor(execute) {
    this.status = 'pending';


    const resolve = (value) => {
      this.value = value;
      this.status = 'resolved';
    }

    const reject = (error) => {
      this.error = error;
      this.status = 'rejected';
    }

    try {
      execute(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === 'pending') {
      onFulfilled(this.value);
    } else if (this.status === 'rejected') {
      onRejected(this.error);
    }
  }

  catch(onRejected) {
    if (this.status === 'rejected') {
      onRejected(this.error);
    }
  }
}