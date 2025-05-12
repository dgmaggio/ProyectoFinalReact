import React from 'react';
import PageHeader from '../components/common/PageHeader';

const Nosotros = () => {
    return (
        <section>
            <PageHeader />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:w-1/2 gap-4 lg:gap-12 mx-auto px-4 lg:px-8 pb-6 lg:pb-12">
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam suscipit augue ac tortor blandit porttitor. Curabitur hendrerit et sapien at vehicula. Integer sit amet ante quam. Nam vulputate ex eget dignissim fringilla. Maecenas sed vehicula libero, nec malesuada purus. Pellentesque quis augue pretium lacus lacinia imperdiet. Phasellus nulla purus, venenatis et elementum nec, iaculis eu lorem. Ut rhoncus nibh quis purus aliquam, id lobortis urna aliquam. In a interdum tellus, vel dapibus lacus.
                </div>

                <div>
                    Morbi efficitur justo in risus lobortis, vel ultrices quam auctor. Sed eget sapien sit amet lectus semper aliquet vitae eget lectus. Duis a porttitor dui, vel sagittis nunc. Donec et venenatis massa. Nunc at purus vitae sapien scelerisque dictum. Aenean ex lectus, interdum sed sagittis at, auctor gravida felis. Cras magna ligula, consequat ut mollis posuere, euismod vel velit. Donec rhoncus nunc diam. Fusce nec laoreet massa. Ut enim sapien, posuere vitae viverra et, sodales in diam. Fusce ultrices lorem a ligula commodo.
                </div>
            </div>
        </section>
    );
};

export default Nosotros;